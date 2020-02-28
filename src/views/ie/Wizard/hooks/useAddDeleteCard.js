import { useFormikContext } from "formik"
import useValidateForm from "./useValidateForm"

function useAddDeleteCard() {
	const { isValid } = useFormikContext()
	const validate = useValidateForm()

	async function addCard(initValues, type, push, addItem) {
		type.length && (await validate())
		if (isValid) {
			await push(initValues)
			addItem(type)
		}
		!type.length && (await validate())
	}

	async function deleteCard(type, index, remove, deleteItem) {
		await remove(index)
		deleteItem(type)
		validate()
	}

	return [{ addCard, deleteCard }]
}

export default useAddDeleteCard
