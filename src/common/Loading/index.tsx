import React, { FunctionComponent } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import styles from './Loading.module.scss'

interface Props {
  show: boolean
}

const Loading: FunctionComponent<Props> = (props: Props) => {
  if (props.show) {
    return (
      <>
        <div className={styles.loading}>
          <SyncLoader color="white" loading={true} size={15} />
        </div>
      </>
    )
  }
  return null
}

export default Loading
