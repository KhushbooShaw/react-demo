import moment, { Moment } from "moment";
import { IUser, IActivityPeriods } from "../models/user.model";
import _ from "lodash";

export const getActivityPeriod = (selectedDate: Moment, userData: IUser) => {
    const activityPeriods: IActivityPeriods[] =  [];
    const defaultActivityPeriods = _.get(userData,"activity_periods",[]);
    if (defaultActivityPeriods.length > 0) {
      const startTime = moment(selectedDate).tz(userData.tz || '').startOf('day');
      const endTime =  moment(selectedDate).tz(userData.tz || '').endOf('day');
      defaultActivityPeriods.forEach(item => {
          const apStartTime = moment(item.start_time).tz(userData.tz || '');
          const apEndTime = moment(item.end_time).tz(userData.tz || '');
        if ((apStartTime >= startTime && apStartTime <= endTime) && (apEndTime >= startTime && apEndTime <= endTime)) {
         activityPeriods.push(item);
        } else if (apStartTime >= startTime && apStartTime <= endTime)
        {
          activityPeriods.push({
              start_time: item.start_time,
              end_time: endTime
          });
        } else if (apEndTime >= startTime && apEndTime <= endTime) {
          activityPeriods.push({
              start_time: startTime,
              end_time: item.end_time
          });
        }
      })
    }
    return activityPeriods;
};