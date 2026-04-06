import { Container } from '@/shared/ui/display';
import { ProductsTable } from '@/widgets/products-table';
import { Logout } from '@/widgets/logout';

export default function Home() {
  return (
    <Container className='w-150'>
      <Logout />
      <ProductsTable />
    </Container>
  );
}
