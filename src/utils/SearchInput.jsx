import { useState, useCallback } from 'react';
import { Select } from 'antd';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const { Option } = Select;

let timeout;

const SearchInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();

    const { service, contentType } = props;

    const fetchData = useCallback( (value, callback) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const fetch = async () => {
            try {
                const { data } = await service.getAllItems();
                if (data) {
                    const filteredData = data.filter(content => {
                        return content.title.toLowerCase().includes(value.toLowerCase());
                    });

                    const newData = filteredData.map(content => ({
                        text: content.title,
                        value: content.id,
                    }))

                    callback(newData);
                }

            } catch (err) {
                toast.error("There was an error receiving data.");
            }
        }
        timeout = setTimeout(fetch, 300);

    }, [service])

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