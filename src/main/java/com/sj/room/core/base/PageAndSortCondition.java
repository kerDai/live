package com.sj.room.core.base;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
/**
 * 分页查询基础类
 * Created by duanke
 * Date: 2016/10/26.
 * Time: 14:23
 */
public abstract class PageAndSortCondition implements Serializable {

    private final static int DEFAULT_LIMIT = 20;

    /**
     * 分页起始行号
     */
    private int start;

    /**
     * 分页读取行号
     */
    private int limit;

    /**
     * 多字段排序 例：sortNo_1_id_0 1为降序，0为升序 0可省略
     */
    private String orderby;

    /**
     * 从1开始计数
     */
    private int page;

    public PageAndSortCondition() {
        this(0, 20);
    }

    public PageAndSortCondition(int start, int limit) {
        this.start = start;
        this.limit = limit;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        if (limit <= 0) {
            limit = DEFAULT_LIMIT;
        }
        this.limit = limit;
    }


    private int getQueryPage() {
        if (page > 0) {
            return page - 1;
        }
        if (start <= 0)
            return 0;

        if (limit <= 0) {
            limit = DEFAULT_LIMIT;
        }

        return start / limit;
    }

    public String getOrderby() {
        return orderby;
    }

    public void setOrderby(String orderby) {
        this.orderby = orderby;
    }


    /**
     * 获取排序集合
     *
     * @return
     */
    public Sort getSort() {
        String sortText = orderby;

        if (sortText == null || "".equals(sortText))
            sortText = this.getDefaultSort();

        List<Order> sortOrders = new LinkedList<>();
        String[] ods = sortText.split("_");
        for (int i = 0, l = ods.length; i < l; i++) {
            if ("".equals(ods[i])) {
                continue;
            }
            String field = ods[i];
            Direction dc = Direction.ASC;
            if (i < (l - 1)) {
                if (ods[i + 1].equals("1")) {
                    dc = Direction.DESC;
                    i++;
                } else if (ods[i + 1].equals("0")) {
                    i++;
                }
            }

            sortOrders.add(new Order(dc, field));
        }
        if (sortOrders.isEmpty()) {
            return null;
        }
        return new Sort(sortOrders);
    }

    public int getPage() {
        return this.page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public Pageable toPageable() {
        return new PageRequest(getQueryPage(), limit, getSort());
    }

    /**
     * 默认排序
     *
     * @return
     */
    protected abstract String getDefaultSort();
}
