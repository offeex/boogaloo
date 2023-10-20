import { LuciaError } from 'lucia'
import { ActionFailure, fail } from '@sveltejs/kit'

export const getFormData = async (request: Request) =>
	Object.fromEntries(await request.formData()) as Record<string, string>

export const wrapAuthError = async (
	callback: () => Promise<void> | ActionFailure,
	message: string
) => {
	try {
		await callback()
	} catch (error) {
		if (error instanceof LuciaError) {
			console.log(400, error.message)
			return fail(400, { message })
		} else {
			console.log(500, error)
			return fail(500, { message: 'An unknown error occurred' })
		}
	}
}
