import {BadRequestException, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {NftService} from './NftService';
import {NftError} from './NftError';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    FlowBurnNft, FlowDeployNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft,
    EthTransferErc721,
    UpdateCashbackErc721,
    CeloUpdateCashbackErc721,
} from '@tatumio/tatum';
import {PathAddressContractAddressChain} from './dto/PathAddressContractAddressChain';
import {PathTokenIdContractAddressChain} from './dto/PathTokenIdContractAddressChain';
import {PathChainTxId} from './dto/PathChainTxId';

export abstract class NftController {
    protected constructor(protected readonly service: NftService) {
    }

    @Get('/v3/nft/balance/:chain/:contractAddress/:address')
    public async getBalanceErc721(@Param() path: PathAddressContractAddressChain) {
        try {
            return await this.service.getTokensOfOwner(path.chain, path.address, path.contractAddress);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/transaction/:chain/:txId')
    public async getTransaction(@Param() path: PathChainTxId) {
        try {
            return await this.service.getTransaction(path.chain, path.txId);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/address/:chain/:txId')
    public async getContractAddress(@Param() path: PathChainTxId) {
        try {
            return await this.service.getContractAddress(path.chain, path.txId);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/metadata/:chain/:contractAddress/:tokenId')
    public async getMetadataErc721(@Param() path: PathTokenIdContractAddressChain, @Query('account') account: string) {
        try {
            return await this.service.getMetadataErc721(path.chain, path.tokenId, path.contractAddress, account);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/royalty/:chain/:contractAddress/:tokenId')
    public async getRoyaltyErc721(@Param() path: PathTokenIdContractAddressChain) {
        try {
            return await this.service.getRoyaltyErc721(path.chain, path.tokenId, path.contractAddress);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/transaction')
    @HttpCode(HttpStatus.OK)
    public async transactionErc721(@Body() body: CeloTransferErc721 | EthTransferErc721 | FlowTransferNft) {
        try {
            return await this.service.transferErc721(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/mint')
    @HttpCode(HttpStatus.OK)
    public async mintErc721(@Body() body: CeloMintErc721 | EthMintErc721 | FlowMintNft) {
        try {
            return await this.service.mintErc721(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Put('/v3/nft/royalty')
    @HttpCode(HttpStatus.OK)
    public async updateRoyaltyErc721(@Body() body: CeloUpdateCashbackErc721 | UpdateCashbackErc721) {
        try {
            return await this.service.updateCashbackForAuthor(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/mint/batch')
    @HttpCode(HttpStatus.OK)
    public async mintMultipleErc721(@Body() body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft) {
        try {
            return await this.service.mintMultipleErc721(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/burn')
    @HttpCode(HttpStatus.OK)
    public async burnErc721(@Body() body: CeloBurnErc721 | EthBurnErc721 | FlowBurnNft) {
        try {
            return await this.service.burnErc721(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/deploy')
    @HttpCode(HttpStatus.OK)
    public async deployErc721(@Body() body: CeloDeployErc721 | EthDeployErc721 | FlowDeployNft) {
        try {
            return await this.service.deployErc721(body);
        } catch (e) {
            if (['Array', 'NftError', 'ValidationError'].includes(e.constructor.name)) {
                throw new BadRequestException(e);
            }
            if (e.constructor.name === 'TatumError') {
                throw e;
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }
}
