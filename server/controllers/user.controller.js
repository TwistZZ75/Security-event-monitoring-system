const db = require('../database')

class UserController{
    async createUser (req, reply){
        const{username, access_level = 'viewer'} = req.body
        const newUser = await db.query(`INSERT INTO users (username, access_level) values ($1, $2) RETURNING *`, [username, access_level])

        reply.send(newUser.rows[0])
    }

    async getOneUser (req, reply){
        const id = req.params.id
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
        reply.send(user.rows[0])
    }

    async getAllUsers (req, reply){
        const users = await db.query(`SELECT * FROM users`)
        reply.send(users.rows)
    }

    async updateUser(req, reply) {
        try {
            // Добавляем подробное логирование
            console.log('Request body:', JSON.stringify(req.body, null, 2));
            
            const { id, ...updates } = req.body;
            console.log('Extracted id:', id);
            console.log('Extracted updates:', updates);

            const setClauses = [];
            const values = [];
            let paramCount = 0;

            // Проверяем каждое поле и добавляем только если оно передано И не равно null
            if (updates.username !== undefined && updates.username !== null) {
                setClauses.push(`username = $${++paramCount}`);
                values.push(updates.username);
                console.log('Adding username to update:', updates.username);
            }
            if (updates.access_level !== undefined && updates.access_level !== null) {
                setClauses.push(`access_level = $${++paramCount}`);
                values.push(updates.access_level);
                console.log('Adding access_level to update:', updates.access_level);
            }
            if (updates.last_login !== undefined && updates.last_login !== null) {
                setClauses.push(`last_login = $${++paramCount}`);
                values.push(updates.last_login);
                console.log('Adding last_login to update:', updates.last_login);
            }

            console.log('Set clauses:', setClauses);
            console.log('Values:', values);

            // Если нет полей для обновления
            if (setClauses.length === 0) {
                console.log('No fields to update');
                return reply.status(400).send({ error: 'No fields to update' });
            }

            // Добавляем id в конец значений
            values.push(id);
            
            const query = `
                UPDATE users 
                SET ${setClauses.join(', ')} 
                WHERE id = $${values.length} 
                RETURNING *
            `;

            console.log('Final query:', query);
            console.log('Final values:', values);

            const result = await db.query(query, values);
            
            if (result.rows.length === 0) {
                console.log('User not found with id:', id);
                return reply.status(404).send({ error: 'User not found' });
            }
            
            console.log('Update successful, result:', result.rows[0]);
            reply.send(result.rows[0]);
        } catch (error) {
            console.error('Database error details:', error);
            reply.status(500).send({ 
                error: 'Database error', 
                details: error.message,
                code: error.code 
            });
        }
    }

    
    async deleteUser (req, reply){
        const id = req.params.id
        const user = await db.query(`DELETE FROM users WHERE id = $1`, [id])
        reply.send(user.rows[0])
    }
}

module.exports = new UserController()