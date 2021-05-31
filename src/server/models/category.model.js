import sqlz from 'sequelize';
const { Model, DataTypes } = sqlz;

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.hasMany(models.Product, { foreignKey: 'category_id'});
			//this.belongsTo(models.Category);
			// this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}
	
	Category.init({
		category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
    	primaryKey: true,
			allowNull: false
		},
		name: DataTypes.STRING,
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Category',
		tableName: 'Categories',
		updatedAt: 'updated_at',
  	createdAt: 'created_at'
	});
	
	return Category;
}
