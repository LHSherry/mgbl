import { Card,Space} from 'antd';
import {} from "@ant-design/icons"
import styles from "./index.less"
export default ({value,name}) =>{
    return(
        <div className={styles.card}>
            <div className={styles.horn}>
                    <div className={styles.num}>
                        {value}
                    </div>
                    <div className={styles.title}>
                        {name}
                    </div>
            </div>  
        </div>
    )
}