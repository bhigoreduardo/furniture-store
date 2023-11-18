import useApp from '../../../../../hooks/use-app'
import IconSocial from '../../../ui/icon/icon-social'

export default function SocialNav() {
  const { store } = useApp()

  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-semibold text-white text-base uppercase">
        Funcionamento
      </h4>
      <div className="flex flex-col gap-1">
        {store?.clockAvailable?.split(',').map((item, i) => (
          <span key={i} className="text-sm text-gray-400">
            {item}
          </span>
        ))}
      </div>
      {/* <span className="text-sm text-gray-400">Seg. a Sex. 8h às 18h</span> */}
      <h4 className="font-semibold text-white text-base uppercase">Siga nos</h4>
      <div className="flex items-center gap-3">
        <IconSocial />
      </div>
    </div>
  )
}
