# notion-core
This project aims to re-create the concept of dynamically editable components seen on
[notion.so](https://notion.so).

## Why?
The idea of the end user being able to freely manipulate website elements is really powerful. Having an
opensource project like this means that developers can create their own custom components, or incorporate this
functionality in part of their react websites.

## How does it work?
It's actually really easy!

Each dynamic component has 2 modes: `display`, and `edit`. To create a new dynamic component, simply create a
component for each these modes and pass it in to the `ComponentWrapper` component. You can also chose to pass
in props to each mode component.

Below is the actual code for the `TextField` component.
```JSX
// This component is displayed when the component is in `display` mode
const TextDisplayComponent = ({ text, setComponentMode, ...props }) => {
  const classes = useStyles();

  // when the user hovers over the element
  // switch to edit mode
  const handleEdit = () =>
    setComponentMode("edit");

  return (
    <Typography 
      onMouseEnter={handleEdit} 
      className={classes.display} 
      {...props}
    >
      {text}
    </Typography>
  );
}

// This component is displayed when the component is in `edit` mode
const TextEditComponent = ({ text = '', setText, setComponentMode, ...props }) => {
  const ref = useRef();
  const classes = useStyles();
  
  // focus the input ref
  useEffect(() => {
    ref.current.focus();
  })

  const handleEdit = event => setText(event.target.value);

  return (
    <MuiInputBase
      className={classes.edit}
      onChange={handleEdit}
      value={text}
      inputRef={ref}
      {...props}
    />
  );
}

// This is the final exported component
const TextField = ({ text, setText, displayProps, editProps }) =>
  <ComponentWrapper 

    displayComponent={<TextDisplayComponent />}
    editComponent={<TextEditComponent />}

    displayProps={{
      text,
      ...displayProps
    }}
    editProps={{
      text,
      setText,
      ...editProps
    }}

    // default mode of the component
    mode="display" 
  />

export default TextField;
```

Now using this code in your app is easy as pie
```JSX
const App = () => {
  // keep track of state for the text component
  // as your app grows you might think of using redux or apollo...
  const [text, setText] = useState('hello world');

  return (
    <div style={{height: '100%', width: 400, margin: '0 auto'}}>
        <TextField text={text} setText={setText} />
    </div>
  );
}
```
With the functionality implemented in the `TextField` component defined above, the component should become
editable when hovered.

## Basic Docs
This project is still in very early development, but if you want to create your own component, here's what you should
know.

### ComponentWrapper
You're gonna need to use this component to create new dynamic components.
| Prop             | Required | Type           | Description                                   |
| :--------------: | :------: | :------------: | :-------------------------------------------: |
| displayComponent |        ✓ | Component      | The component to render when in display mode. |
| editComponent    |        ✓ | Component      | The component to render when in edit mode.    |
| displayProps     |          | Object         | Any props passed to `displayComponent`        |
| editProps        |          | Object         | Any props passed to `editComponent`           |
| mode             |          | String         | The default mode of the component. If not defined, the component will not render | 

## PRs are welcome!
If you want to help me out on this project, feel free! Any suggestions are welcome :)
