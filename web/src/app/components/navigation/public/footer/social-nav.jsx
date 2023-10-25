import Social from '../../../ui/icon/social'

export default function SocialNav() {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-semibold text-white text-base uppercase">
        Funcionamento
      </h4>
      <span className="text-sm text-gray-400">Seg. a Sex. 8h às 18h</span>
      <h4 className="font-semibold text-white text-base uppercase">Siga nos</h4>
      <div className="flex items-center gap-3">
        <Social />
      </div>
    </div>
  )
}
