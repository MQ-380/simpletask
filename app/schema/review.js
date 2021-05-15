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
            type: DataTypes.STRING(100000),
            allowNull: false,
            field: 'has_done'
        },
        create_by: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'has_done'
        },

    },{
        freezeTableName: false
    })
}
module.exports = review
