import useValidateForm from "./useValidateForm"

export default function useAddDeleteCard() {


    const validate = useValidateForm()

	async function addCard(initValues, type, push, addItem) {
        
        let isValid = true

        if(type.length) {
            isValid = await validate()
        }        
 
		if (isValid) {
			await push(initValues)
			addItem(type)
        }
		
	}

	async function deleteCard(index, deleteItem, remove) {
		await remove(index)
		deleteItem(index)
		validate()
    }

	return [{ addCard, deleteCard}]
}

