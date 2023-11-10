import IconLoader from './icon/icon-loader'

export default function LoaderContainer() {
  return (
    <article className="fixed flex items-center justify-center z-20 top-0 left-0 right-0 bottom-0 w-full h-full bg-black opacity-40">
      <IconLoader />
    </article>
  )
}
