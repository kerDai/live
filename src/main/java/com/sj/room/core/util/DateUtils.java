package com.sj.room.core.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Title: DateUtils
 * Package: com.sj.room.core.util
 * Description: 日期处理工具类
 * Created by: duanke
 * Date: 2016/12/14  15:58
 */
public class DateUtils {

    private static SimpleDateFormat getDateParser(String pattern) {
        return new SimpleDateFormat(pattern);
    }

    /**
     * 前一天
     *
     * @return
     */
    public static String getYesterDay() {
        Calendar calendar = Calendar.getInstance();// 此时打印它获取的是系统当前时间
        calendar.add(Calendar.DATE, -1); // 得到前一天
        String yesterdayDate = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
        return yesterdayDate;
    }

    /**
     * 当月第一天
     *
     * @return
     */
    public static String getMonthDay() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 0);
        c.set(Calendar.DAY_OF_MONTH, 1);// 设置为1号,当前日期既为本月第一天
        return format.format(c.getTime());
    }

    /**
     * 前月第一天
     *
     * @return
     */
    public static String getYesterMonthDayStart() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal_1 = Calendar.getInstance();// 获取当前日期
        cal_1.add(Calendar.MONTH, -1);
        cal_1.set(Calendar.DAY_OF_MONTH, 1);// 设置为1号,当前日期既为本月第一天
        return format.format(cal_1.getTime());
    }

    /**
     * 获取前月的最后一天
     *
     * @return
     */
    public static String getYesterMonthDayEnd() {
        //
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cale = Calendar.getInstance();
        cale.set(Calendar.DAY_OF_MONTH, 0);// 设置为1号,当前日期既为本月第一天
        return format.format(cale.getTime());
    }

    /**
     * 获取某年第一天日期
     * @return Date
     */
    public static String getCurrYearFirst(){
        Calendar ca = Calendar.getInstance();
        ca.setTime(new java.util.Date());
        int year = ca.get(Calendar.YEAR);
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        Date currYearFirst = calendar.getTime();
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
        String sDate = f.format(currYearFirst);
        return sDate;
    }

    /**
     * 获取某年最后一天日期
     * @return Date
     */
    public static String getCurrYearLast(){
        Calendar ca = Calendar.getInstance();
        ca.setTime(new java.util.Date());
        int year = ca.get(Calendar.YEAR);
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        Date currYearLast = calendar.getTime();
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
        String sDate = f.format(currYearLast);
        return sDate;
    }

    /**
     * 获取当前月最后一天的字符串日期
     *
     * @return
     */
    public static String getTheLastDayOfCurrentMonth() {

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");//
        Calendar cal = Calendar.getInstance();// 获取当前日期，例如2012-08-02
        cal.set(Calendar.DAY_OF_MONTH, 1);// 转变为当前月的第一天，例如2012-08-01
        cal.add(Calendar.MONTH, 1);// 转变为下个月的第一天，例如2012-09-01
        cal.add(Calendar.DAY_OF_MONTH, -1);// 下个月第一天，倒数一天，即为当前月的最后一天。例如2012-08-31
        return df.format(cal.getTime());
    }

    public static String longToDate(Long time, String pattern) {
        if (time != null)
            return getDateParser(pattern).format(new Date(time));
        else
            return "";
    }

    public static String longToDate(Long time) {
        return getDateParser("yyyy-MM-dd").format(new Date(time));
    }

    public static String longToDate2(Long time) {
        return getDateParser("MM-dd HH:mm").format(new Date(time));
    }

    public static String longToDateAll(Long time) {
        return getDateParser("yyyy-MM-dd HH:mm:ss").format(new Date(time));
    }

    public static String longToDateAllNew(Long time) {
        return getDateParser("yyyyMMddHHmmss").format(new Date(time));
    }

    public static String getCurrentDateString() {
        return getDateParser("yyyy-MM-dd HH:mm:ss").format(new Date(System.currentTimeMillis()));
    }

    /***
     * String型日期转为long型
     * @param source
     * @return long 日期
     */
    public static long dateToLong(String source) {
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
        try {
            return getDateParser("yyyy/MM/dd").parse(source).getTime();
        } catch (ParseException e) {
            try {
                return getDateParser("yyyy-MM-dd").parse(source).getTime();
            } catch (ParseException e1) {
                return -1;
            }
        }

    }

    public static long dateAddOneDayAndToLong(String source) {
        try {
            Date date = getDateParser("yyyy/MM/dd").parse(source);
            Calendar cd = Calendar.getInstance();
            cd.setTime(date);
            cd.add(Calendar.DAY_OF_MONTH, 1);
            return cd.getTime().getTime();
        } catch (ParseException e) {
            try {
                Date date = getDateParser("yyyy-MM-dd").parse(source);
                Calendar cd = Calendar.getInstance();
                cd.setTime(date);
                cd.add(Calendar.DAY_OF_MONTH, 1);
                return cd.getTime().getTime();
            } catch (ParseException e1) {
                return -1;
            }
        }
    }

    public static long nextDate(String source) {
        try {
            return getDateParser("yyyy/MM/dd").parse(source).getTime() + 24 * 60 * 60 * 1000;
        } catch (ParseException e) {
            try {
                return getDateParser("yyyy-MM-dd").parse(source).getTime() + 24 * 60 * 60 * 1000;
            } catch (ParseException e1) {
                return -1;
            }
        }

    }

    public static String longToFrontDate(Long time) {
        return getDateParser("yyyy-MM-dd").format(new Date(time - 24 * 60 * 60 * 1000));
    }

    /***
     * String型日期转为long型
     *
     * @param source
     *            String型日期
     * @return long 日期
     * @throws ParseException
     */
    public static long dateAllToLong(String source) {
        try {
            return getDateParser("yyyy/MM/dd HH:mm:ss").parse(source).getTime();
        } catch (ParseException e) {
            try {
                return getDateParser("yyyy-MM-dd HH:mm:ss").parse(source).getTime();
            } catch (ParseException e1) {
                return -1;
            }
        }

    }

    /**
     * 生成流水号
     *
     * @return 类似"20090507095515693"的字符串(15位)
     */
    public static long genSerialNumber() {
        return Long.valueOf(getDateParser("yyyyMMddHHmmsss").format(new Date()));
    }

    public static long genYMD() {
        return Long.valueOf(getDateParser("yyyyMMdd").format(new Date()));
    }

    /**
     * 获得日期
     */
    public static Date getDate(String birthday) {
        return new Date(dateToLong(birthday));
    }

    /**
     * 获取日期字符
     *
     * @param date
     *            日期
     * @param format
     *            格式 如:yyy-MM-dd
     * @return
     */
    public static String getDate(Date date, String format) {
        return getDateParser(format).format(date);
    }

    public static void main(String[] args) {
        System.out.println(DateUtils.getDate(new Date(), "yyyyMMddhhmmss"));
    }

    public static String getDate(Date date) {
        return getDateParser("yyyy-MM-dd").format(date);
    }

    public static Date toDate(String dataString, String format) throws ParseException {
        return getDateParser(format).parse(dataString);
    }

    /**
     * 获得当前日期
     *
     * @return
     */
    public static long getNowDate() {
        return DateUtils.dateToLong(getDateParser("yyyy-MM-dd").format(new Date()));
    }

    /**
     * 获得当前日期
     *
     * @return
     */
    public static long getNowDate(Date curDate) {
        return DateUtils.dateToLong(getDateParser("yyyy-MM-dd").format(curDate));
    }

    /**
     * 获取当前时间加上任意天数后的日期
     *
     * @param dayNum
     *            天数
     * @return
     */
    public static String getNewDateByAdd(int dayNum) {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, dayNum);
        return (new SimpleDateFormat("yyyy-MM-dd")).format(cal.getTime());
    }

    public static String getNewDateByAdd(int dayNum, String format) {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, dayNum);
        return (new SimpleDateFormat(format)).format(cal.getTime());
    }

    public static Date getDateByAdd(Date date, int num, int timeType) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(timeType, num);
        return cal.getTime();
    }

    /**
     * 获取指定时间加上任意小时后的日期
     *
     * @param hour
     *            天数
     * @return
     */
    public static String getNewDateByAddHour(int hour) {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.HOUR, hour);
        return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(cal.getTime());
    }

    /**
     * @获取当前月份最大天数
     * @author lidong
     * @return 当前月份最大天数
     * @2011-12-26
     */
    public static int lastDayOfMonth() {
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        return value;
    }

    /**
     * 得到有效期天数
     *
     * @param days
     * @return
     */
    public static Date addDays(long days) {
        Date date = new Date();
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    public static Date addDays(Date date, long days) {
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    /**
     * 获取某年某月的最后一天
     *
     * @param year
     *            年
     * @param month
     *            月
     * @return 最后一天
     */
    public static int getLastDayOfMonth(int year, int month) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        if (month == 2) {
            if (isLeapYear(year)) {
                return 29;
            } else {
                return 28;
            }
        }
        return 0;
    }

    /**
     * 是否闰年
     *
     * @param year
     *            年
     * @return
     */
    public static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    /**
     * 获得下个月最后一天的日期
     *
     * @return
     */
    public String getNextMonthEnd(int da) {
        String str = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar lastDate = Calendar.getInstance();
        lastDate.add(Calendar.MONTH, da);// 加一个月
        lastDate.set(Calendar.DATE, 1);// 把日期设置为当月第一天
        lastDate.roll(Calendar.DATE, -1);// 日期回滚一天，也就是本月最后一天
        str = sdf.format(lastDate.getTime());
        return str;
    }

    /**
     * 月份相加
     *
     * @return
     */
    public String getNextMonth(int da) {
        String str = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar lastDate = Calendar.getInstance();
        lastDate.add(Calendar.MONTH, da);// 加一个月
        str = sdf.format(lastDate.getTime());
        return str;
    }

    /**
     * @获取当前年份及往前5年的年份集合
     * @author lidong
     * @return 当前年份及往前5年的年份集合
     * @2012-01-11
     */
    public static List<Object> getYearList() {
        List<Object> yearList = new ArrayList<Object>();
        Calendar cal = Calendar.getInstance();
        int currentYear = cal.get(Calendar.YEAR);
        for (int i = 0; i < 5; i++) {
            Map<String, Object> yearMap = new HashMap<String, Object>();
            yearMap.put("id", currentYear);
            yearMap.put("text", currentYear + "年");
            if (i == 0) {
                yearMap.put("selected", true);
            }
            yearList.add(yearMap);
            currentYear = currentYear - 1;
        }
        return yearList;
    }

    /**
     * @description 得到两个天数之间相差天数
     * @param startDate
     * @param endDate
     * @return
     */
    public static Long getTwoDayCount(Date startDate, Date endDate) {
        long count = 0;
        count = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
        return count;
    }

}
