import Badge from '@/components/atoms/Badge';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'info';
      case 'confirmed':
        return 'success';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'no-show':
        return 'warning';
      case 'pending':
        return 'warning';
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Badge 
      variant={getStatusVariant(status)} 
      className={className}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;