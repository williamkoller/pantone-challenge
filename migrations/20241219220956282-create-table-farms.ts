import { DataTypes, Migration } from './umzugClient';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('farms', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    procuder_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'producers',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    total_area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    arable_area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    vegetation_area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  await queryInterface.addIndex('farms', ['state'], { unique: true });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('farms');
};
