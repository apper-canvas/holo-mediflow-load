import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { motion } from 'framer-motion';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  className = '',
  showButton = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (!showButton) {
      onSearch(e.target.value);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className={`flex space-x-2 ${className}`}
    >
      <div className="flex-1">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          icon="Search"
          className="w-full"
        />
      </div>
      {showButton && (
        <Button type="submit" icon="Search">
          Search
        </Button>
      )}
    </motion.form>
  );
};

export default SearchBar;