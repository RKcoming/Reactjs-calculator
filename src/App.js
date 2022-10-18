import React,{useReducer} from "react";
import DigitButton  from "./DigitButton";
import OperationButton from "./OperationButton";
export const ACTIONS={
    ADD_DIGIT:"add-digit",
    CHOOSE_OPERATION:"choose-operation",
    CLEAR:"clear",
    DELETE_DIGIT:'delete-digit',
    EVALUATE:"evaluate"
}
function arthimatic(b,a,operation){
    switch(operation){
        case "+":
            return Number(a)+Number(b);
        case "-":
            return Number(a)-Number(b);
        case "*":
            return Number(a)*Number(b);
        case "/":
            return Number(a)/Number(b);
    }
}
function reducer(state,{type,payload}){
   
    switch(type){
        case ACTIONS.ADD_DIGIT:
            if(state.overWrite){
                return {
                    currentOperand:payload.digit,
                    previousOperand:null,
                    overWrite:false,
                    operation:null
                }
            }
            if(payload.digit==0 && state.currentOperand==0) return state;
            if(payload.digit==="." && String(state.currentOperand).includes("."))return state;
           
            return {
                ...state,
                currentOperand:`${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {};
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand==null && state.previousOperand==null) 
                return state;


            if(state.previousOperand!=null ){
                if(state.currentOperand==null){
                    return{
                        ...state,
                        operation:payload.operation
                    }
                    
                }
                return {
                    previousOperand:arthimatic(state.currentOperand,state.previousOperand,state.operation),
                    currentOperand:null,
                    operation:payload.operation
                }
            }
            return {  
                 previousOperand: state.currentOperand,
                 currentOperand:null,
                 operation:payload.operation
              }
        case ACTIONS.EVALUATE:
            if(state.operation==null || state.currentOperand==null || state.previousOperand==null){
                return state;
            }
            return {
                currentOperand:arthimatic(state.currentOperand,state.previousOperand,state.operation),
                overWrite:true,
                previousOperand:null,
                operation:null
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.overWrite){
                return{
                    ...state,
                    currentOperand:null,
                    overWrite:false
                }
            }
            if(state.currentOperand==null){
                if(state.previousOperand==null){
                    return state;
                }
                return{
                    ...state,
                    currentOperand:state.previousOperand,
                    previousOperand:null,
                    operation:null
                }
            }
            if(state.currentOperand.length===1){
                return {...state,currentOperand:null}
            }
            return {
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            }
        
    }

}
function App(){
    const [{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{});
   return <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand}{operation}
                </div>
                <div className="current-operand">{currentOperand}
                </div>     
            </div>
           
           
            <button className="span-two" onClick={()=>{dispatch({type:ACTIONS.CLEAR})}}>AC</button>
            <button  onClick={()=>{dispatch({type:ACTIONS.DELETE_DIGIT})}}>DEL</button>
           
            <OperationButton operation="/" dispatch={dispatch}></OperationButton>
            <DigitButton digit="1" dispatch={dispatch}></DigitButton>
            <DigitButton digit="2" dispatch={dispatch}></DigitButton>
            <DigitButton digit="3" dispatch={dispatch}></DigitButton>
            <OperationButton operation="*" dispatch={dispatch}></OperationButton>
            <DigitButton digit="4" dispatch={dispatch}></DigitButton>
            <DigitButton digit="5" dispatch={dispatch}></DigitButton>
            <DigitButton digit="6" dispatch={dispatch}></DigitButton>
            <OperationButton operation="+" dispatch={dispatch}></OperationButton>
            <DigitButton digit="7" dispatch={dispatch}></DigitButton>
            <DigitButton digit="8" dispatch={dispatch}></DigitButton>
            <DigitButton digit="9" dispatch={dispatch}></DigitButton>
            <OperationButton operation="-" dispatch={dispatch}></OperationButton>
            <DigitButton digit="." dispatch={dispatch}></DigitButton>
            <DigitButton digit="0" dispatch={dispatch}></DigitButton>
          
            <button className="span-two" onClick={()=>{dispatch({type:ACTIONS.EVALUATE})}}>=</button>

   </div>
}
export default App;