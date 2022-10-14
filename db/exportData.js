function users() {
    const allUsers = [{
        username: 'matheus@gmail.com',
        password: '1234'
    },
    {
        username: 'yago@gmail.com',
        password: '5678'
    }]

    return allUsers;

}

function cars() {
    return [
        'chevete',
        'fusca',
        'passat'
    ]
}

module.exports = { users, cars }
