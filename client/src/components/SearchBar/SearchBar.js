import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

const SearchBar = ({ getOptionList }) => {


  const handleChange = (value) => {
    getOptionList(value)
  }
  return (
    <>
      <Select
        mode="multiple"
        style={{ width: '45vw', marginTop: "15px" }}
        onChange={handleChange}
        optionLabelProp="label"
      >
        <Option value="information">Information</Option>
        <Option value="algorithim">Algorithims</Option>
        <Option value="technology">Technology</Option>
        <Option value="entertainment">Entertainment</Option>
        <Option value="other">Other</Option>

      </Select>

    </>
  )
}

export default SearchBar