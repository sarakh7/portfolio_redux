import { useState } from 'react';
import { Select } from 'antd';
import { useEffect } from 'react';
const { Option } = Select;


const SearchInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();

    const {fetchData, contentType} = props;

    useEffect(() => {
        setValue(null);
        setData([]);
    }, [contentType])

    const handleSearch = (newValue) => {
        if (newValue) {
            fetchData(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const options = data.map((d) => <Option key={d.value}>{d.text}</Option>);
    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            onSelect={props.onSelect}
        >
            {options}
        </Select>
    );
};

export default SearchInput;