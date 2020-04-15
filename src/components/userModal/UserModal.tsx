
import React from 'react';
import { Modal, Row, Col, DatePicker } from 'antd';
import { IUser } from '../../shared/models/user.model';
import { Moment } from 'moment';
import moment from 'moment-timezone';
import { dateFormat, getActivityPeriodUI } from '../../shared/utilities/constants';
import _ from 'lodash';
import './UserModal.scss';
import { getActivityPeriod } from '../../shared/utilities/helper';

interface IUserModalProps {
    modalData: IUser;
    selectedDate: Moment | string;
    onModalClose: () => void;
    onDateChange: (value: Moment | null, dateString: string) => void;
};

const UserModal: React.FC<IUserModalProps> = (props: IUserModalProps) => {   
    const disabledDate = (current: any) => {
        return current && current > moment().endOf('day');
    }
    const renderComponent = (
        modalData: IUser,
        selectedDate: Moment | string,
        onDateChange: (value: Moment | null, dateString: string) => void
    ) => {
        const activity_periods = getActivityPeriod(moment(selectedDate), modalData);
        const localComponentData = [
            {
                key: 1,
                displayName: 'Selected Date',
                value: selectedDate
            },
            {
                key: 2,
                displayName: 'Active Periods on selected date',
                value: activity_periods
            }
        ];
      return (<>
          {modalData &&
          localComponentData.map(i => (
              <span key={i.key}>
              {i.displayName === 'Selected Date' ?
              (
                <>
                 <h4>
                     <b>{i.displayName}</b>
                 </h4>
                     <span style={{ display: 'flex', paddingTop: '5px' }}>
                      <Col className='user-modal-date-picker'>
                       <DatePicker 
                        defaultValue={moment(selectedDate).tz(modalData.tz || '')}
                        size="small"
                        onChange={onDateChange}
                        allowClear={false}
                        format={dateFormat}
                        disabledDate={disabledDate}
                       />
                      </Col>
                     </span>
                </>
              )
              :(
                  <>
                  <h4><b>{i.displayName}</b></h4>
                  {getActivityPeriodUI(activity_periods)}
                  </>
              )}
              </span>
          )
          )}
          </>
      )
    };
        return(
            <div className="user-modal">
             <Modal
              title={_.get(props.modalData, 'real_name','DUMMY USER')}
              onCancel={props.onModalClose}
              maskClosable={false}
              footer={null}
              centered
              visible
              width="600px"
              >
               <Row style={{ display:'flex' }} align="middle">
                <Col>
                  {renderComponent(props.modalData, props.selectedDate, props.onDateChange)}
                </Col>
               </Row>
              </Modal> 
            </div>   
        );    
}

export default UserModal;

