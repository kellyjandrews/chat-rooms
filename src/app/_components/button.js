export default function Button(props) {
  let { children } = props
  return (
    <>
      <button className="mx-2 p-2 bg-white text-black" {...props}>
        {children}
      </button>
    </>
  )
}
