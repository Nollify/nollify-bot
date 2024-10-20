import express from 'express'

// Mock admin credentials (replaced with MongoDB check later on)
const admins = [{ username: 'admin', password: 'admin' }]

export const loadAdminRoutes = (app: express.Express): void => {
	app.get('/login', (request: express.Request, response: express.Response) => {
		response.render('login', { error: null })
	})

	app.post('/login', (request: express.Request, response: express.Response) => {
		const { username, password } = request.body
		try {
			const admin = admins.find((admin) => admin.username === username && admin.password === password)
			if (admin) {
				(request.session as any).admin = true
				return response.redirect('/admin/dashboard')
			}
			return response.render('login', { error: 'Invalid credentials' })
		} catch (error: any) {
			return response.render('login', { error: error.message })
		}
	})

	app.get('/logout', (request: express.Request, response: express.Response) => {
		request.session.destroy(() => {
			response.redirect('/login')
		})
	})

	app.get('/admin/dashboard', (request: express.Request, response: express.Response) => {
		if ((request.session as any).admin) {
			return response.render('dashboard')
		}
		return response.redirect('/login')
	})

	app.get('/admin/rules', (request: express.Request, response: express.Response) => {
		if ((request.session as any).admin) {
			return response.render('admin', { title: 'Manage Rules' })
		}
		return response.redirect('/login')
	})

	app.get('/admin/announcements', (request: express.Request, response: express.Response) => {
		if ((request.session as any).admin) {
			return response.render('admin', { title: 'Manage Announcements' })
		}
		return response.redirect('/login')
	})
}
