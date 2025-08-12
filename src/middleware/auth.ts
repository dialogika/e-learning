import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthUtils } from '../utils/auth';
import { AuthenticatedRequest } from '../types';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required',
      });
    }

    const decoded = AuthUtils.verifyToken(token) as JWTPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

/**
 * Middleware to check if user has admin role
 */
export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }

  next();
};

/**
 * Middleware to check if user is accessing their own resource or is admin
 */
export const requireOwnershipOrAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.role === 'ADMIN' || req.user.id === resourceUserId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied',
  });
}; 