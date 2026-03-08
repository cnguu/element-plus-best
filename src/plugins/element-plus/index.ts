import { ElCard, ElForm, ElTable } from 'element-plus'

export function setupElementPlusPropDefault() {
  ElTable.TableColumn.props.align = {
    type: String,
    default: 'center',
  }

  ElCard.props.shadow = {
    type: String,
    default: 'never',
  }

  ElForm.props.requireAsteriskPosition = {
    type: String,
    default: 'right',
  }
}
