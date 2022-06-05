import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table
export class File extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  size: number;

  @Column(DataType.STRING(10))
  extension: string;

  @Column(DataType.STRING(100))
  mimetype: string;

  @Column(DataType.INTEGER)
  width: number;

  @Column(DataType.INTEGER)
  height: number;

  @Column(DataType.STRING(150))
  paths: string;

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

  @Column(DataType.VIRTUAL)
  urls: any;
}
