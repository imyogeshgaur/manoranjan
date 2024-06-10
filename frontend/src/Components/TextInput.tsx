const TextInput = (props: any) => {
  if(props.isTextBox){
    return (
      <textarea 
        placeholder={props.placeholder}
        className={props?.className}
        style={props?.style}
        value={props.value}
        name={props?.name}
        onChange={props.onChange}
        rows={props.row}
        cols={props.col}
      />
    )
  }else{
    if(props.type==='file'){
      return (
        <input
          type={props.type}
          title={props.placeholder}
          style={{backgroundColor:"white"}}
          name={props?.name}
          readOnly={true}
          onChange={props.onChange}
        />
      );
    }else{
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
      );
    }
  }
};

export default TextInput;
