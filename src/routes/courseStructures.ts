import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthenticatedRequest, CreateCourseStructureRequest, UpdateCourseStructureRequest } from '../types';

const router = Router();

// Validation middleware
const validateCreateStructure = [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('lectures').isInt({ min: 1 }).withMessage('Lectures must be a positive integer'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('order').isInt({ min: 1 }).withMessage('Order must be a positive integer'),
  body('courseId').trim().notEmpty().withMessage('Course ID is required'),
  body('videoUrl').optional().isURL().withMessage('Video URL must be a valid URL'),
  body('pdfUrl').optional().isURL().withMessage('PDF URL must be a valid URL'),
];

const validateUpdateStructure = [
  body('title').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('lectures').optional().isInt({ min: 1 }).withMessage('Lectures must be a positive integer'),
  body('duration').optional().trim().notEmpty().withMessage('Duration cannot be empty'),
  body('order').optional().isInt({ min: 1 }).withMessage('Order must be a positive integer'),
  body('videoUrl').optional().isURL().withMessage('Video URL must be a valid URL'),
  body('pdfUrl').optional().isURL().withMessage('PDF URL must be a valid URL'),
];

// Get all structures for a course
router.get('/course/:courseId', async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const structures = await prisma.courseStructure.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });

    res.json({
      success: true,
      message: 'Course structures retrieved successfully',
      data: structures,
    });
  } catch (error) {
    console.error('Get course structures error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get structure by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const structure = await prisma.courseStructure.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
          },
        },
      },
    });

    if (!structure) {
      return res.status(404).json({
        success: false,
        message: 'Course structure not found',
      });
    }

    res.json({
      success: true,
      message: 'Course structure retrieved successfully',
      data: structure,
    });
  } catch (error) {
    console.error('Get structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Create new structure (admin only)
router.post('/', authenticateToken, requireAdmin, validateCreateStructure, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const structureData: CreateCourseStructureRequest = req.body;

    // Verify course exists and user has permission
    const course = await prisma.course.findUnique({
      where: { id: structureData.courseId },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    if (req.user?.role !== 'ADMIN' && course.createdById !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const structure = await prisma.courseStructure.create({
      data: structureData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Course structure created successfully',
      data: structure,
    });
  } catch (error) {
    console.error('Create structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Update structure (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateUpdateStructure, async (req: AuthenticatedRequest, res: Response) => {
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
    const updateData: UpdateCourseStructureRequest = req.body;

    // Get structure with course info
    const structure = await prisma.courseStructure.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!structure) {
      return res.status(404).json({
        success: false,
        message: 'Course structure not found',
      });
    }

    // Check permissions
    if (req.user?.role !== 'ADMIN' && structure.course.createdById !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const updatedStructure = await prisma.courseStructure.update({
      where: { id },
      data: updateData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            instructor: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Course structure updated successfully',
      data: updatedStructure,
    });
  } catch (error) {
    console.error('Update structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Delete structure (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Get structure with course info
    const structure = await prisma.courseStructure.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!structure) {
      return res.status(404).json({
        success: false,
        message: 'Course structure not found',
      });
    }

    // Check permissions
    if (req.user?.role !== 'ADMIN' && structure.course.createdById !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    await prisma.courseStructure.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Course structure deleted successfully',
    });
  } catch (error) {
    console.error('Delete structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Reorder structures (admin only)
router.put('/reorder/:courseId', authenticateToken, requireAdmin, [
  body('structures').isArray().withMessage('Structures must be an array'),
  body('structures.*.id').isString().withMessage('Structure ID is required'),
  body('structures.*.order').isInt({ min: 1 }).withMessage('Order must be a positive integer'),
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

    const { courseId } = req.params;
    const { structures } = req.body;

    // Verify course exists and user has permission
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    if (req.user?.role !== 'ADMIN' && course.createdById !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    // Update all structures with new order
    const updatePromises = structures.map((structure: { id: string; order: number }) =>
      prisma.courseStructure.update({
        where: { id: structure.id },
        data: { order: structure.order },
      })
    );

    await Promise.all(updatePromises);

    // Get updated structures
    const updatedStructures = await prisma.courseStructure.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });

    res.json({
      success: true,
      message: 'Course structures reordered successfully',
      data: updatedStructures,
    });
  } catch (error) {
    console.error('Reorder structures error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router; 