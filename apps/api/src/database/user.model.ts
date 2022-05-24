import {
  Column,
  Model,
  Table,
  DataType,
  IsEmail,
  AllowNull,
  Default,
} from 'sequelize-typescript';

import { ROLES } from '@utils/constant';

@Table
export class User extends Model {
  @Column(DataType.ENUM(...Object.keys(ROLES)))
  role: string;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  mobile: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Default(1)
  @Column(DataType.TINYINT)
  status: boolean;

  @Default(0)
  @Column(DataType.TINYINT)
  deleted: boolean;

  @AllowNull
  @Column(DataType.INTEGER)
  created_by: number;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  deleted_at: Date;

  @AllowNull
  @Column(DataType.INTEGER)
  deleted_by: number;
}
