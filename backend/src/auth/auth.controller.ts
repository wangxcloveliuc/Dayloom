import { Controller, Post, Body, UseGuards, Request, Get, Put, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Register endpoint
   */
  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Login endpoint
   */
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Get current user profile (protected route)
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      id: user.id,
      email: user.email,
      selectedTheme: user.selectedTheme,
      createdAt: user.createdAt,
    };
  }

  /**
   * Update user preferences
   */
  @UseGuards(JwtAuthGuard)
  @Put('preferences')
  async updatePreferences(
    @Request() req,
    @Body() updateData: { selectedTheme?: string },
  ) {
    const updatedUser = await this.usersService.updatePreferences(
      req.user.id,
      updateData.selectedTheme,
    );
    
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      selectedTheme: updatedUser.selectedTheme,
    };
  }
}
