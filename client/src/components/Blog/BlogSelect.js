import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const BlogSelect = ({ selected }) => {
  const onChange = (value) => {
    if (!value) {

    }
    console.log(value)
    selected(value)
  }
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="sports">Sports</Option>
      <Option value="health">Health</Option>
      <Option value="food">Food</Option>
      <Option value="technology">Technology</Option>
      <Option value="other">Other</Option>
    </Select>
  )
}

export default BlogSelect