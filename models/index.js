const Blogpost = require('./Blogpost');
const Comment = require('./Comment');
const User = require('./User');

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});