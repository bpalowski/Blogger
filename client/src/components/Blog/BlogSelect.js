import React, { } from 'react'
import { Select } from 'antd';

const { Option } = Select;

const BlogSelect = ({ selected, selectedEditCatagory }) => {

  const onChange = (value) => {
    return selectedEditCatagory ? selectedEditCatagory(value) : selected(value)
  }


  return (
    <Select
      showSearch
      style={{ width: 200 }}
      name="catagory"
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="information">Information</Option>
      <Option value="algorithim">Algorithim</Option>
      <Option value="technology">Technology</Option>
      <Option value="entertainment">Entertainment</Option>
      <Option value="other">Other</Option>
    </Select>
  )
}

export default BlogSelect