import './directory.styles.scss'

import SECTIONS_DATA from './sections.data'
import MenuItem from '../menu-item/menu-item.component'

const Directory = () => {
  const sections = SECTIONS_DATA

  return (
    <div className="directory-menu">
      {
        sections.map(({id, ...otherSectionProps}) => (
          <MenuItem
            key={id}
            {...otherSectionProps}
          />
        ))
      }
    </div>
  )
}

export default Directory
