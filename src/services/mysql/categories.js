const categories = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM categories', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao obter as categorias', reject)
            return false
          }
          resolve({ categories: results })
        })
      })
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao salvar a categoria', reject)
            return false
          }
          resolve({ category: {name, id: results.insertId} })
        })
      })
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE categories SET name=? WHERE id=?', [name, id], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao atualizar a categoria', reject)
            return false
          }
          resolve({ category: {name, id: id} })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM categories WHERE id=?', [id], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao remover a categoria', reject)
            return false
          }
          resolve({ message: 'Categoria removida com sucesso' })
        })
      })
    }
  }
}

module.exports = categories
