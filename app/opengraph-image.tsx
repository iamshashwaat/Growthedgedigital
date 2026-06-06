import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'GrowthEdge Digital - Your Vision, Our Craft, Real Growth'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '80%',
            background: '#F5A623',
            borderRadius: '50%',
            opacity: 0.08,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '50%',
            height: '80%',
            background: '#F5A623',
            borderRadius: '50%',
            opacity: 0.05,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: 48,
                height: 4,
                background: '#F5A623',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                color: '#F5A623',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              GROWTHEDGE DIGITAL
            </span>
          </div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 72,
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Your Vision,
          </h1>
          <h1
            style={{
              color: '#F5A623',
              fontSize: 72,
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
              marginTop: 8,
            }}
          >
            Our Craft, Real Growth
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 28,
              textAlign: 'center',
              marginTop: 32,
              maxWidth: 600,
              fontWeight: 400,
            }}
          >
            Digital Marketing • Web Development • Branding
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
