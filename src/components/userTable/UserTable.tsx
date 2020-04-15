import React from 'react';
import { IUser } from '../../shared/models/user.model';
import { ColumnProps } from 'antd/lib/table';
import { Tooltip, Spin, Table } from 'antd';
import './UserTable.scss';

interface IUserTableProps {
  userData: IUser[];
  userColumn: Array<ColumnProps<IUser>>;
  loading: boolean;
  onItemClick: (params: IUser) => void;
};

const UserTable: React.FC<IUserTableProps> = (props: IUserTableProps) =>{ 
    const showModelDetails = (props: IUserTableProps, params: IUser) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      props.onItemClick(params); 

    const parseColumn = (cols: Array<ColumnProps<IUser>>) => 
      cols.map(i => {
          i.dataIndex === 'real_name' &&
          (i.render = (text: string, params: any) => {
              return (

                  <Tooltip title={text}>
                   <button
                     className="name-button"
                     onClick={showModelDetails(props, params)}
                   >
                   {text}
                   </button>
                  </Tooltip>
              )
          })
          return i;
      })
    const column = parseColumn(props.userColumn); 
        return(
          <div className="user-table-grid">
           <Spin spinning={props.loading}>
            <Table 
             columns={column} 
             dataSource={props.userData}
             locale={{
              emptyText: (
                <p>No data Found</p>
              )
            }}
            />
           </Spin>
          </div>
        );  
}

export default UserTable;

