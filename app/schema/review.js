const review = (sequelize, DataTypes) => {
    return sequelize.define('reviews',{
        review_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        review_from: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'review_from'
        },
        review_to: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'review_to'
        },
        has_done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'has_done'
        },
        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            field: 'content'
        },
        create_by: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'create_by'
        },

    },{
        freezeTableName: false
    })
}
module.exports = review
