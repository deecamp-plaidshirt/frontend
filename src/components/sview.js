const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]

function Viewpager(prop) {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useDrag(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    //console.log(down  )
    //console.log(distance)
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
  })
  /*
  return props.map(({ x, display, sc }, i) => (
    <animated.div className={prop.className} {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pages[i]})` }} />
    </animated.div>
  ))*/
  return(
    <animated.div className={prop.className} {...bind()} >
      
    </animated.div>
  )
}

const SView = styled(Viewpager)`
  position: absolute;
  width: 100vw;
  height: 50vh;
  top: 50vh;
  will-change: transform;
  
  div{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 100%;
    will-change: transform;
    box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  }  

`;