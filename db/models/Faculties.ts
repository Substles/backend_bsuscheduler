import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../connection";

export interface FacultiesInterface {
  id?: number;
  name: string;
  initials: string;
  password: string | null;
}

class Faculties extends Model<FacultiesInterface> {
  public id!: number;
  public name!: string;
  public initials!: string;
  public password!: string | null;
}

Faculties.init({
  name: DataTypes.STRING,
  initials: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize: sequelizeConnection,
  modelName: 'Faculties'
});

export default Faculties;