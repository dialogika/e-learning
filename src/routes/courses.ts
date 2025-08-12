import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthenticatedRequest, CreateCourseRequest, UpdateCourseRequest, PaginationParams } from '../types';

const router = Router();

// Validation middleware
const validateCreateCourse = [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('image').isURL().withMessage('Image must be a valid URL'),
  body('instructor').trim().isLength({ min: 2, max: 50 }).withMessage('Instructor must be between 2 and 50 characters'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('level').trim().notEmpty().withMessage('Level is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
];

const validateUpdateCourse = [
  body('title').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('instructor').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Instructor must be between 2 and 50 characters'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('level').optional().trim().notEmpty().withMessage('Level cannot be empty'),
  body('duration').optional().trim().notEmpty().withMessage('Duration cannot be empty'),
];

// Get all courses with pagination and filtering (requires authentication)
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '', category = '', level = '' } = req.query as PaginationParams;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { instructor: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (level) {
      where.level = level;
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          structures: {
            orderBy: { order: 'asc' },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      success: true,
      message: 'Courses retrieved successfully',
      data: courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Search courses (requires authentication)
router.get('/search', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { 
      q = '', 
      category = '', 
      level = '', 
      instructor = '', 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query as any;
    
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};

    // Search in multiple fields
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { instructor: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
        { level: { contains: q, mode: 'insensitive' } },
      ];
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by level
    if (level) {
      where.level = level;
    }

    // Filter by instructor
    if (instructor) {
      where.instructor = { contains: instructor, mode: 'insensitive' };
    }

    // Validate sortBy
    const allowedSortFields = ['title', 'instructor', 'category', 'level', 'createdAt', 'duration'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          structures: {
            orderBy: { order: 'asc' },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { [sortField]: sortDirection },
      }),
      prisma.course.count({ where }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      success: true,
      message: 'Courses search completed successfully',
      data: courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
      searchInfo: {
        query: q,
        category,
        level,
        instructor,
        sortBy: sortField,
        sortOrder: sortDirection,
      },
    });
  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get course by ID (requires authentication)
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        structures: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Create new course (admin only)
router.post('/', authenticateToken, requireAdmin, validateCreateCourse, async (req: AuthenticatedRequest, res: Response) => {
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

    const courseData: CreateCourseRequest = req.body;

    const course = await prisma.course.create({
      data: {
        ...courseData,
        createdById: req.user.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Update course (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateUpdateCourse, async (req: AuthenticatedRequest, res: Response) => {
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
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const updateData: UpdateCourseRequest = req.body;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Delete course (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    await prisma.course.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get courses by creator (requires authentication)
router.get('/creator/:userId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const { page = 1, limit = 10 } = req.query as PaginationParams;
    const skip = (Number(page) - 1) * Number(limit);

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: { createdById: userId },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          structures: {
            orderBy: { order: 'asc' },
          },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where: { createdById: userId } }),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      success: true,
      message: 'Creator courses retrieved successfully',
      data: courses,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get creator courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router; 