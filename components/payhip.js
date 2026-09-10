import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

const Payhip = () => (
  <>
    <script
      type="text/javascript"
      async
      src="https://payhip.com/payhip.js"
    ></script>
    <style jsx global>{`
      iframe.payhip-checkout-iframe {
        color-scheme: light;
      }
    `}</style>
  </>
)

export const BuyButton = ({ productId, price }) => {
  const { t } = useLanguage()
  const handleClick = e => {
    e.preventDefault()
    global.Payhip.Checkout.open({
      product: productId
    })
  }

  return (
    <Button
      as={NextLink}
      onClick={handleClick}
      href={`https://payhip.com/b/${productId}`}
      colorScheme="teal"
    >
      {t('wallpaperDetail.common.buyButton', { price })}
    </Button>
  )
}

export default Payhip
