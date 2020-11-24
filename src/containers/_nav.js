import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Planner',
    route: '/planner',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Route Planner',
        to: '/route-planner',
      }
    ],
  },
]

