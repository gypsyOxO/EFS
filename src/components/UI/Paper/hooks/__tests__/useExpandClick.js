import { renderHook, act } from "@testing-library/react-hooks"

import useExpandClick from "../useExpandClick"

let input = [{ IE_COMM_ID: 6448 }, { IE_COMM_ID: 6449 }]


test("test useExpandClick - empty init", () => {
		
    //const { result } = renderHook(() => useExpandClick([]))
    const { result } = renderHook(() => useExpandClick())
   
    expect(typeof result.current.deleteItem).toBe("function")
    expect(typeof result.current.addItem).toBe("function")
    expect(typeof result.current.handleExpandClick).toBe("function")
    expect(typeof result.current.ExpandButton).toBe("function")
})



describe("Test expandClick", () => {

	test("with 2 values", () => {
		
		const { result } = renderHook(() => useExpandClick(input))

		expect(result.current.expanded).toStrictEqual([false,false])
    })
    
    test("add item", () => {
        
        const { result } = renderHook(() => useExpandClick(input))
        
        act(() => {
            result.current.addItem()
        })

        
        expect(result.current.expanded).toStrictEqual([false,false,true])
    })

    test("delete item", () => {
        
        const { result } = renderHook(() => useExpandClick(input))
        
        act(() => {
            result.current.deleteItem(1)
        })
        
        expect(result.current.expanded).toEqual([false])

        
    })

    test("handle expand click", () => {
        const {result } = renderHook(() => useExpandClick(input))

        act(() => {
            result.current.handleExpandClick(1)
        })

        expect(result.current.expanded).toEqual([false,true])
        

    })



})
