import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);

    try {
      //save the new user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credential taken!',
          );
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findFirst(
      {
        where: {
          email: dto.email,
        },
      },
    );
    //if doesnt'exist throw error
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    //compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!pwMatches) {
      throw new ForbiddenException(
        'Wrong password!',
      );
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    console.log(token)

    return {
      access_token: token
    };
  }
}
