import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket : (basket: Basket) => void;
    removeItem: (model: string, quantity: number) => void;
    //addItem: (productId: number, quantity: number) => void;

    
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context ===undefined) {
        throw Error("Greska");

    }
    return context;
}


export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(model: string, quantity:number) {
        if(!basket) return;
        const items= [...basket.items];
        const itemIndex = items.findIndex(i=> i.name === model);
        if (itemIndex>=0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity ===0 || quantity ===0) items.splice(itemIndex,1);
            setBasket(prevState => {
                return {...prevState!,items}
            })
        }
    }
    // function addItem(productId: number, quantity:number) {
    //     if(!basket) return;
    //     const items= [...basket.items];
    //     const itemIndex = items.findIndex(i=> i.productId === productId);
    //     if (itemIndex>=0) {
    //         items[itemIndex].quantity += quantity;
    //         setBasket(prevState => {
    //             return {...prevState!,items}
    //         })
    //     }
    // }
    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}


