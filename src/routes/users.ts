import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthenticatedRequest, UpdateUserRequest, PaginationParams } from '../types';
import bcrypt from 'bcryptjs';

const router = Router();

// Validation middleware
const validateUpdateUser = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
  body('role').optional().isIn(['ADMIN', 'STUDENT']).withMessage('Role must be either ADMIN or STUDENT'),
];

const validateUpdateOwnProfile = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
];



// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query as PaginationParams;
    const skip = (Number(page) - 1) * Number(limit);

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get user by ID (ADMIN ONLY)
router.get('/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Update user profile (name, email, avatar, role) - ADMIN ONLY
router.put('/:id', authenticateToken, requireAdmin, validateUpdateUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData: UpdateUserRequest = req.body;

    // Check if email is being updated and if it's already taken
    if (updateData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: updateData.email,
          id: { not: id },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get own profile - User can view their own profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Update own profile (name, email, avatar) - User can update their own profile
router.put('/profile', authenticateToken, validateUpdateOwnProfile, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const updateData = req.body;
    const userId = req.user.id;

    // Check if email is being updated and if it's already taken
    if (updateData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: updateData.email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Update user password (ADMIN ONLY - no current password required)
router.put('/:id/password', authenticateToken, requireAdmin, [
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
], async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { newPassword } = req.body;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    res.json({
      success: true,
      message: 'User password updated successfully',
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});



// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user?.id === id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router; 