
import React from 'react';
import { connect } from 'react-redux';
import { getEntities } from '../../shared/reducers/user/user.reducer';
import { IUserResponse, IUser } from '../../shared/models/user.model';
import { users, userColumn } from '../../shared/utilities/constants';
import UserTable from '../userTable/UserTable';
import { ColumnProps } from 'antd/lib/table';
import 'antd/dist/antd.css';
import './Home.scss'
import UserModal from '../userModal/UserModal';
import moment, { Moment } from 'moment';

interface IHomeProps {
    loading: boolean;
    users: IUserResponse;
};
interface IState {
   userData: IUser[];
   userColumn: Array<ColumnProps<IUser>>;
   isModalOpen: boolean;
   modalData: IUser;
   selectedDate: Moment | string;
};

type IProps = IHomeProps & IStateToProps & IDispatchToProps;
class Home extends React.Component<IProps,IState> {  
    constructor(props: IProps) {
        super(props);
        this.state = {
            userData: users.members,
            userColumn: userColumn,
            isModalOpen: false,
            modalData: {},
            selectedDate: moment().startOf('day')
        }
    }

    componentDidMount(){
        // API call for getting user response
       // this.props.fetchUsers();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const { users } = this.props;
        if(prevProps.users !== users) {
            users.ok && this.setState({
                userData: users.members.map(i => {
                    i.key = i.id;
                    return i;
                })
            })
        }
    }

    onUserClick = (params: IUser) => {
      this.setState({
          isModalOpen: true,
          modalData: params,
          selectedDate: moment()
      })
    };

    onModalClose = () => {
        this.setState({
            isModalOpen: false,
            selectedDate: moment().startOf('day')
        })
    };

    onDateChange = (value: Moment | null, dateString: string) => {
        this.setState({
            selectedDate: moment(value || '')
        })
    };
       
    render() { 
        const { userData, userColumn, isModalOpen, modalData, selectedDate } = this.state; 
        const { loading } = this.props;
        return(
        <div className="home-container">
          <UserTable
            userData={userData}
            userColumn={userColumn}
            loading={loading}
            onItemClick={this.onUserClick}
          />
          {isModalOpen && (
              <UserModal
                modalData={modalData}
                selectedDate={selectedDate}
                onModalClose={this.onModalClose}
                onDateChange={this.onDateChange}
              />
          )}
        </div>
        );
    }  
}

const mapDispatchToProps = (dispatch: any) => ({
fetchUsers: () => dispatch(getEntities())  
});

interface IDispatchToProps {
    fetchUsers: () => Promise<any>;
}

interface IStateToProps {
    loading: boolean;
    users: IUserResponse;
}
export const mapStateToProps = (storeState: any) => ({
    loading: storeState.user.loading,
    users: storeState.user.users
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
type StateProps = ReturnType<typeof mapStateToProps>;
type Dispatch = typeof mapDispatchToProps;

