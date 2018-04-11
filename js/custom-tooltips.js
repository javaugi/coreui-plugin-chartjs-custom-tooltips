/**
 * --------------------------------------------------------------------------
 * CoreUI Plugins - Custom Tooltips for Chart.js (v1.0.0): custom-tooltips.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */


const CustomTooltips = function (tooltipModel) {
  const ClassName = {
    ABOVE                   : 'above',
    BELOW                   : 'below',
    CHARTJS_TOOLTIP         : 'chartjs-tooltip',
    NO_TRANSFORM            : 'no-transform',
    TOOLTIP_BODY            : 'tooltip-body',
    TOOLTIP_BODY_ITEM       : 'tooltip-body-item',
    TOOLTIP_BODY_ITEM_COLOR : 'tooltip-body-item-color',
    TOOLTIP_BODY_ITEM_LABEL : 'tooltip-body-item-label',
    TOOLTIP_BODY_ITEM_VALUE : 'tooltip-body-item-value',
    TOOLTIP_HEADER          : 'tooltip-header',
    TOOLTIP_HEADER_ITEM     : 'tooltip-header-item'
  }

  const Selector = {
    DIV     : 'div',
    SPAN    : 'span',
    TOOLTIP : `${this._chart.canvas.id}-tooltip`
  }

  let tooltip = document.getElementById(Selector.TOOLTIP)

  if (!tooltip) {
    tooltip = document.createElement('div')
    tooltip.id = Selector.TOOLTIP
    tooltip.className = ClassName.CHARTJS_TOOLTIP
    this._chart.canvas.parentNode.appendChild(tooltip)
  }

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltip.style.opacity = 0
    return
  }

  // Set caret Position
  tooltip.classList.remove(ClassName.ABOVE, ClassName.BELOW, ClassName.NO_TRANSFORM)
  tooltipModel.yAlign ? tooltip.classList.add(tooltipModel.yAlign) : tooltip.classList.add(ClassName.NO_TRANSFORM)

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || []

    const tooltipHeader = document.createElement(Selector.DIV)
    tooltipHeader.className = ClassName.TOOLTIP_HEADER

    titleLines.forEach((title) => {
      const tooltipHeaderTitle = document.createElement(Selector.DIV)
      tooltipHeaderTitle.className = ClassName.TOOLTIP_HEADER_ITEM
      tooltipHeaderTitle.innerHTML = title
      tooltipHeader.appendChild(tooltipHeaderTitle)
    })

    const tooltipBody = document.createElement(Selector.DIV)
    tooltipBody.className = ClassName.TOOLTIP_BODY

    const tooltipBodyItems = tooltipModel.body.map((item) => item.lines)
    tooltipBodyItems.forEach((item, i) => {
      const tooltipBodyItem = document.createElement(Selector.DIV)
      tooltipBodyItem.className = ClassName.TOOLTIP_BODY_ITEM

      const colors = tooltipModel.labelColors[i]

      const tooltipBodyItemColor = document.createElement(Selector.SPAN)
      tooltipBodyItemColor.className = ClassName.TOOLTIP_BODY_ITEM_COLOR
      tooltipBodyItemColor.style.backgroundColor = colors.backgroundColor

      tooltipBodyItem.appendChild(tooltipBodyItemColor)

      if (item[0].split(':').length > 1) {
        const tooltipBodyItemLabel = document.createElement(Selector.SPAN)
        tooltipBodyItemLabel.className = ClassName.TOOLTIP_BODY_ITEM_LABEL
        tooltipBodyItemLabel.innerHTML = item[0].split(': ')[0]

        tooltipBodyItem.appendChild(tooltipBodyItemLabel)

        const tooltipBodyItemValue = document.createElement(Selector.SPAN)
        tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE
        tooltipBodyItemValue.innerHTML = item[0].split(': ').pop()

        tooltipBodyItem.appendChild(tooltipBodyItemValue)
      } else {
        const tooltipBodyItemValue = document.createElement(Selector.SPAN)
        tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE
        tooltipBodyItemValue.innerHTML = item[0]

        tooltipBodyItem.appendChild(tooltipBodyItemValue)
      }

      tooltipBody.appendChild(tooltipBodyItem)
    })

    tooltip.innerHTML = ''

    tooltip.appendChild(tooltipHeader)
    tooltip.appendChild(tooltipBody)
  }

  const positionY = this._chart.canvas.offsetTop
  const positionX = this._chart.canvas.offsetLeft

  // Display, position, and set styles for font
  tooltip.style.opacity = 1
  tooltip.style.left = `${positionX + tooltipModel.caretX}px`
  tooltip.style.top = `${positionY + tooltipModel.caretY}px`
}

export default CustomTooltips
