
const TextInput = (props:any) => {
  return (
        <input 
            type={props.type}
            placeholder={props.placeholder}
            className={props?.className}
            style={props?.style}
            value={props.value}
            name={props?.name}
            onChange={props.onChange}
        />
  )
}

export default TextInput